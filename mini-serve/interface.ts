type Rewrite = {
  source: string;
  destination: string;
}

type Redirect = Rewrite;

export default interface Config {
  entry: string;
  rewrites: Rewrite[];
  redirects: Redirect[];
  etag: boolean;
  cleanUrls: boolean;
  trailingSlash: boolean;
  symlink: boolean;
}