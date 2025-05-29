import { Node } from "./Node";

test('create Node instance and get name', () => {
  const node = new Node('test');
  expect(node).toBeInstanceOf(Node);
  expect(node.name).toEqual('test');
  expect((new Node('/')).name).toEqual('/');
});

test('create Node instance with dynamic name', () => {
  const node = new Node('[id]');
  expect(node.name).toEqual('[id]');
  expect(node.isDynamic).toBeTruthy();
})

test('create Node instance with dynamic name with slash and get name', () => {
  const node = new Node('/[id]');
  expect(node.isDynamic).toBeFalsy();
  expect(node.name).toEqual('/[id]');
})

test('create Node instance with invalid dynamic name and get name', () => {
  const node1 = new Node('id]');
  expect(node1.isDynamic).toBeFalsy();
  expect(node1.name).toEqual('id]');

  const node2 = new Node('[id');
  expect(node2.isDynamic).toBeFalsy();
  expect(node2.name).toEqual('[id');
})