import { shell } from "electron";
import React from "react";

export function linkifyText(text: string): React.ReactNode | string {
  const regex = /https?:\/\/?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?/gi;
  const fragments: (string | React.ReactNode)[] = [];
  let match: RegExpExecArray | null;
  let prevIndex = 0;

  while ((match = regex.exec(text)) != null) {
    const link = match[0];
    fragments.push(text.slice(prevIndex, match.index));
    fragments.push(
      <a key={prevIndex} onClick={createLinkClickHandler(link)}>
        {link}
      </a>
    );
    prevIndex = match.index + link.length;
  }

  if (fragments.length === 0) {
    return text;
  }

  fragments.push(text.slice(prevIndex));

  return <React.Fragment>{fragments}</React.Fragment>;
}

function createLinkClickHandler(link: string) {
  return (evt: React.SyntheticEvent) => {
    shell.openExternal(link);
    // prevent todo item from changing status
    evt.stopPropagation();
    evt.preventDefault();
  };
}
