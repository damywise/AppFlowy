import { Slate, Editable } from 'slate-react';
import Leaf from './Leaf';
import { useTextBlock } from './TextBlock.hooks';
import NodeComponent from '../Node';
import HoveringToolbar from '../_shared/HoveringToolbar';
import React, { useEffect } from 'react';
import { Node } from '$app/interfaces/document';

function TextBlock({
  node,
  childIds,
  placeholder,
  ...props
}: {
  node: Node;
  childIds?: string[];
  placeholder?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { editor, value, onChange, onKeyDownCapture, onDOMBeforeInput } = useTextBlock(node.id);
  return (
    <>
      <div {...props} className={`py-[2px] ${props.className}`}>
        <Slate editor={editor} onChange={onChange} value={value}>
          <HoveringToolbar id={node.id} />
          <Editable
            onKeyDownCapture={onKeyDownCapture}
            onDOMBeforeInput={onDOMBeforeInput}
            renderLeaf={(leafProps) => <Leaf {...leafProps} />}
            placeholder={placeholder || 'Please enter some text...'}
          />
        </Slate>
      </div>
      {childIds && childIds.length > 0 ? (
        <div className='pl-[1.5em]'>
          {childIds.map((item) => (
            <NodeComponent key={item} id={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default React.memo(TextBlock);
