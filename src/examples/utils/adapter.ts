import { ReactNode } from "react";

export namespace HtmlAdapters {
  export namespace Select {
    export type Option =
      | string
      | number
      | {
          label: ReactNode | string;
          value: string | number;
          disabled?: boolean;
          extra?: any;
        };

    export function toOptions<T>(
      data: T[],
      map: (value: T) => Option
    ): Option[] {
      let options: Option[] = [];

      data.forEach((value) => {
        options.push(map(value));
      });

      return options;
    }
  }
}
