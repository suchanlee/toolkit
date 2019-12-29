import { Classes, Icon, Spinner } from "@blueprintjs/core";
import classNames from "classnames";
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
import { createReadingObject } from "../../objects/readingObject";
import { Reading } from "../../types/types";
import { CancellablePromise, makeCancellable } from "../../utils/cancellablePromise";
import { ReadingSummary } from "./ReadingSummary";

require("./ReadingsUrlPreview.scss");

export namespace ReadingsUrlPreview {
  export interface Props {
    url: string;
  }

  export interface State {
    reading: AsyncValue<Reading>;
  }
}

export class ReadingsUrlPreview extends React.PureComponent<
  ReadingsUrlPreview.Props,
  ReadingsUrlPreview.State
> {
  public state: ReadingsUrlPreview.State = {
    reading: asyncLoading()
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
    const { reading } = this.state;

    if (isLoading(reading)) {
      return (
        <div className="readings-url-preview-loading">
          <Spinner className={Classes.SMALL} />
        </div>
      );
    } else if (isFailedLoading(reading)) {
      return (
        <div className="readings-url-preview-error">
          <Icon className={Classes.SMALL} icon="error" />
          <span className="readings-url-preview-error-message">Failed to load preview</span>
        </div>
      );
    } else if (isLoaded(reading)) {
      return <ReadingSummary reading={reading.value} />;
    }

    return undefined;
  }

  private fetchUrlMetadata = debounce(async () => {
    this.setState({ reading: asyncLoading() });
    this.fetchPromise?.cancel();

    const promise = ipcRenderer.callMain<string>(
      IpcEvent.REQUEST_URL_METADATA,
      this.props.url
    ) as Promise<GrabItResponse>;
    this.fetchPromise = makeCancellable(promise);
    this.fetchPromise.promise
      .then(res => {
        const reading: Reading = createReadingObject({
          url: this.props.url,
          title: res.title,
          description: res.description,
          imageUrl: res.image ?? res.favicon
        });
        this.setState({ reading: asyncLoaded(reading) });
      })
      .catch(error => this.setState(() => ({ reading: asyncFailedLoading(error) })));
  }, 200);
}
