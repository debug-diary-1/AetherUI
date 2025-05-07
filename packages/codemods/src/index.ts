import { Transform } from 'jscodeshift';

// Example transform that adds a comment to the top of a file
export const addHeaderComment: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Add a header comment if it doesn't exist
  const firstNode = root.find(j.Program).get('body', 0).node;
  if (!firstNode.comments) {
    const comment = j.commentBlock(
      ' This file was modified by AetherUI codemods ',
      true,
      false
    );
    firstNode.comments = [comment];
  }

  return root.toSource();
}; 