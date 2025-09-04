import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

type CaseCardProps = {
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  href: string;
};

export const CaseCard = ({ title, description, image, category, readTime, href }: CaseCardProps) => {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        <div className="aspect-video bg-muted">
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            <span className="text-sm text-muted-foreground">{readTime}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
