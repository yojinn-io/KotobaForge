import type { ReactNode } from 'react';
import { PanelCard } from '../../shared/ui/PanelCard';

type AdvicePanelProps = {
  badge: string;
  markdown: string;
};

type MarkdownBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push({ type: 'list', items: listItems });
      listItems = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: 3, text: line.slice(4) });
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) });
      return;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      listItems.push(line.slice(2));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return blocks;
}

export function AdvicePanel({ badge, markdown }: AdvicePanelProps) {
  const blocks = parseMarkdown(markdown);

  return (
    <PanelCard
      title="AI意見"
      badge={badge}
      className="home-side-panel home-advice-panel"
      bodyClassName="home-side-panel__body"
    >
      <div className="home-advice-markdown">
        {blocks.map((block, index) => {
          if (block.type === 'heading') {
            const Heading = block.level === 2 ? 'h3' : 'h4';
            return (
              <Heading className="home-advice-markdown__heading" key={`${block.text}-${index}`}>
                {renderInlineMarkdown(block.text)}
              </Heading>
            );
          }

          if (block.type === 'list') {
            return (
              <ul className="home-advice-markdown__list" key={`list-${index}`}>
                {block.items.map((item) => (
                  <li key={item}>{renderInlineMarkdown(item)}</li>
                ))}
              </ul>
            );
          }

          return (
            <p className="home-advice-markdown__paragraph" key={`${block.text}-${index}`}>
              {renderInlineMarkdown(block.text)}
            </p>
          );
        })}
      </div>
    </PanelCard>
  );
}
