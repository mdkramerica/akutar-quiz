import { Metadata } from 'next';
import { archetypes, ArchetypeId } from '@/lib/archetypes';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://akutar-quiz-production.up.railway.app';

interface Props {
  params: Promise<{ archetype: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { archetype: archetypeId } = await params;
  const archetype = archetypes[archetypeId as ArchetypeId];

  if (!archetype) {
    return { title: 'Archetype Not Found' };
  }

  const ogImageUrl = `${BASE_URL}/api/og?archetype=${archetypeId}&format=landscape`;
  const pageUrl = `${BASE_URL}/results/${archetypeId}`;

  return {
    title: `I'm ${archetype.name} | Akutar Quiz`,
    description: `"${archetype.tagline}" — ${archetype.description}`,
    openGraph: {
      title: `I'm ${archetype.name}!`,
      description: archetype.tagline,
      url: pageUrl,
      siteName: 'Akutar Quiz',
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${archetype.name} - Akutar Archetype Result Card`,
      }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm ${archetype.name}!`,
      description: archetype.tagline,
      images: [ogImageUrl],
    },
  };
}

export default function ResultLayout({ children }: Props) {
  return children;
}
