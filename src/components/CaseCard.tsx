import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface CaseCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  href: string;
}

export const CaseCard = ({ title, description, image, category, readTime, href }: CaseCardProps) => {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        <div className="aspect-video bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{category}</Badge>
            <span className="text-sm text-muted-foreground">{readTime}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

