/**
 * A helper function when building a list of classes to apply to an element.
 * @param classes a list of parameterised classes.
 * @returns the concatenated list of classes.
 */
const classList = (...classes: string[]): string => classes.filter((c) => !!c).join(' ');
export default classList;
