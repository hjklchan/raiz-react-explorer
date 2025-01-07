export namespace Form {
  export namespace Conversion {
    export const upperCamel = (value: string, sep?: string) => {
      return value
        .split("_")
        .map((value) => {
          console.log(value);
          return value.charAt(0).toUpperCase().concat(value.substring(1));
        })
        .join(sep ?? " ");
    };
  }
}
