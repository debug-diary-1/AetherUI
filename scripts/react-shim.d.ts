declare module 'react' {
  export interface HTMLAttributes<T> {
    key?: string | number;
  }

  export type DetailedHTMLProps<Props, Element> = Props & { ref?: Element };

  namespace JSX {
    interface IntrinsicElements {}
  }
}
