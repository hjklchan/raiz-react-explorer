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
      return data.map<Option>(map);
    }
  }
}
