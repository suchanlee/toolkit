import { Classes, Icon, Spinner } from "@blueprintjs/core";
import classNames from "classnames";
import { shell } from "electron";
import { ipcRenderer } from "electron-better-ipc";
import { GrabItResponse } from "grabity";
import { debounce } from "lodash-es";
import * as React from "react";
import { IpcEvent } from "../../../shared/ipcEvent";
import { AsyncValue } from "../../async/asyncTypes";
import {
  asyncFailedLoading,
  asyncLoaded,
  asyncLoading,
  isFailedLoading,
  isLoaded,
  isLoading
} from "../../async/asyncUtils";
import { CancellablePromise, makeCancellable } from "../../utils/cancellablePromise";

require("./ReadingsUrlPreview.scss");

export namespace ReadingsUrlPreview {
  export interface Props {
    url: string;
  }

  export interface State {
    metadata: AsyncValue<{
      title: string;
      image?: string;
      description?: string;
      favicon?: string;
    }>;
  }
}

export class ReadingsUrlPreview extends React.PureComponent<
  ReadingsUrlPreview.Props,
  ReadingsUrlPreview.State
> {
  public state: ReadingsUrlPreview.State = {
    metadata: asyncLoading()
  };

  private fetchPromise: CancellablePromise<GrabItResponse> | undefined;

  public componentDidMount() {
    this.fetchUrlMetadata();
  }

  public componentDidUpdate(prevProps: ReadingsUrlPreview.Props) {
    if (prevProps.url !== this.props.url) {
      this.fetchUrlMetadata();
    }
  }

  public componentWillUnmount() {
    this.fetchPromise?.cancel();
  }

  public render() {
    return (
      <div className={classNames("readings-url-preview", Classes.ELEVATION_0)}>
        {this.renderPreview()}
      </div>
    );
  }

  public renderPreview() {
    const { metadata } = this.state;

    if (isLoading(metadata)) {
      return (
        <div className="readings-url-preview-loading">
          <Spinner className={Classes.SMALL} />
        </div>
      );
    } else if (isFailedLoading(metadata)) {
      return (
        <div className="readings-url-preview-error">
          <Icon className={Classes.SMALL} icon="error" />
          <span className="readings-url-preview-error-message">Failed to load preview</span>
        </div>
      );
    } else if (isLoaded(metadata)) {
      const { title, image, description, favicon } = metadata.value;
      return (
        <div className="readings-url-preview-loaded">
          {(image != null || favicon != null) && (
            <div
              className="readings-url-preview-loaded-img"
              style={{ backgroundImage: `url(${image ?? favicon})` }}
            />
          )}
          <div className="readings-url-preview-loaded-text">
            <div className="readings-url-preview-loaded-title">
              <a onClick={this.handleTitleClick}>{title}</a>
            </div>
            <div className="readings-url-preview-loaded-description">
              {description ?? "No description available."}
            </div>
          </div>
        </div>
      );
    }

    return undefined;
  }

  private handleTitleClick = () => {
    shell.openExternal(this.props.url);
  };

  private fetchUrlMetadata = debounce(async () => {
    this.setState({ metadata: asyncLoading() });
    this.fetchPromise?.cancel();

    const promise = ipcRenderer.callMain<string>(
      IpcEvent.REQUEST_URL_METADATA,
      this.props.url
    ) as Promise<GrabItResponse>;
    this.fetchPromise = makeCancellable(promise);
    this.fetchPromise.promise
      .then(res => this.setState({ metadata: asyncLoaded(res) }))
      .catch(error => this.setState(() => ({ metadata: asyncFailedLoading(error) })));
  }, 200);
}
