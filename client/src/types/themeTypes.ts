// src/types/themeTypes.ts
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      background: string;
      secondary: string;

      text: string;
      muted: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    borders: {
      radius: string;
    };
  }
}
