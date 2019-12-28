declare module "grabity" {
  export { grabIt, GrabItResponse, grab, GrabResponse };

  function grabIt(url: string): Promise<GrabItResponse>;
  function grab(url: string): Promise<GrabResponse>;

  interface GrabItResponse {
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
  }

  interface GrabResponse {
    "og:site_name"?: string;
    "og:updated_time"?: string;
    "og:title"?: string;
    "og:type"?: string;
    "og:description"?: string;
    "og:image"?: string;
    "twitter:card"?: string;
    "twitter:creator"?: string;
    "twitter:title"?: string;
    "twitter:description"?: string;
    "twitter:image:src"?: string;
    favicon?: string;
  }
}
