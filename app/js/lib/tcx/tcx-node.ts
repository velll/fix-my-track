import { children, firstChild } from "xml-wrappers";

class TCXNode {
  node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  children(name: string): TCXNode[] {
    return children(this.node, name).map(node => new TCXNode(node));
  }

  firstChild(name: string): TCXNode {
    const childNode = firstChild(this.node, name);

    if (!childNode) { throw new Error(`No ${name} child node found`); }

    return  new TCXNode(childNode);
  }

  hasChild(name: string) {
    const childNode = firstChild(this.node, name);

    return !!childNode;
  }

  childContent(name: string, optionalDefault?: string): string {
    const childNode = firstChild(this.node, name);

    if (optionalDefault && (!childNode || !childNode.textContent)) {
      return optionalDefault;
    }

    if (!childNode) {
       if (optionalDefault) {
         return optionalDefault;
       } else {
         throw new Error(`No ${name} child node found`);
       }
    }

    if (!childNode.textContent) {
      if (optionalDefault) {
        return optionalDefault;
      } else {
        throw new Error(`No content found at ${name}`);
      }
    }

    return childNode.textContent;
  }
}

export { TCXNode };
