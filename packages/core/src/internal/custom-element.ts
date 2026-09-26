/** Keep the first registered implementation when independent bundles share a page. */
export function customElement(tagName: string) {
  return <T extends CustomElementConstructor>(constructor: T): T => {
    const registered = customElements.get(tagName);
    if (registered) return registered as T;
    customElements.define(tagName, constructor);
    return constructor;
  };
}
