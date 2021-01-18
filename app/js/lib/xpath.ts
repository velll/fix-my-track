function getNodes(xmldoc: Document, expression: string) {
  console.log('XPath lookup');
  console.log(expression);
  console.log('in');
  console.log(xmldoc);

  const resolver = nsResolver(xmldoc.documentElement);

  const lookupResult = xmldoc.evaluate(
    expression,
    xmldoc,
    resolver,
    XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null);

  console.log('lookup result');
  console.log(lookupResult);

  const nodes = lookupResultToArray(lookupResult);

  console.log('nodes:');
  console.log(nodes);

  return nodes;
}

function lookupResultToArray(lookupResult: XPathResult) {
  const result = [];

  let nextNode = lookupResult.iterateNext();
  while(nextNode) {
    result.push(nextNode);
    nextNode = lookupResult.iterateNext();
  }

  return result;
}

// Dirty hack for namespaces in XPath
// https://stackoverflow.com/questions/40796231/how-does-xpath-deal-with-xml-namespaces
function nsResolver(element: any) {
  const nsResolver = element.ownerDocument.createNSResolver(element);
  const defaultNamespace = element.getAttribute('xmlns');

  return function (prefix:any) {
     return nsResolver.lookupNamespaceURI(prefix) || defaultNamespace;
  };
}

export { getNodes };