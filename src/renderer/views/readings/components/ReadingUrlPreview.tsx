import { Classes, Icon, Spinner } from "@blueprintjs/core";
import classNames from "classnames";
import { ipcRenderer } from "electron-better-ipc";
import { GrabItResponse } from "grabity";
import { debounce } from "lodash-es";
import * as React from "react";
import { IpcEvent } from "../../../../shared/ipcEvent";
import { AsyncValue } from "../../../async/asyncTypes";
import {
  asyncFailedLoading,
  asyncLoaded,
  asyncLoading,
  isFailedLoading,
  isLoaded,
  isLoading
} from "../../../async/asyncUtils";
import { CancellablePromise, makeCancellable } from "../../../utils/cancellablePromise";
import { createReadingObject } from "../readingObject";
import { Reading } from "../readingsTypes";
import { ReadingSummary } from "./ReadingSummary";

require("./ReadingUrlPreview.scss");

export namespace ReadingUrlPreview {
  export interface Props {
    url: string;
  }

  export interface State {
    reading: AsyncValue<Reading>;
  }
}

export class ReadingUrlPreview extends React.PureComponent<
  ReadingUrlPreview.Props,
  ReadingUrlPreview.State
> {
  public state: ReadingUrlPreview.State = {
    reading: asyncLoading()
  };

  private fetchPromise: CancellablePromise<GrabItResponse> | undefined;

  public componentDidMount() {
    this.fetchUrlMetadata();
  }

  public componentDidUpdate(prevProps: ReadingUrlPreview.Props) {
    if (prevProps.url !== this.props.url) {
      this.fetchUrlMetadata();
    }
  }

  public componentWillUnmount() {
    this.fetchPromise?.cancel();
  }

  public render() {
    return (
      <div className={classNames("reading-url-preview", Classes.ELEVATION_0)}>
        {this.renderPreview()}
      </div>
    );
  }

  public renderPreview() {
    const { reading } = this.state;

    if (isLoading(reading)) {
      return (
        <div className="reading-url-preview-loading">
          <Spinner className={Classes.SMALL} />
        </div>
      );
    } else if (isFailedLoading(reading)) {
      return (
        <div className="reading-url-preview-error">
          <Icon className={Classes.SMALL} icon="error" />
          <span className="reading-url-preview-error-message">Failed to load preview</span>
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
