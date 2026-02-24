import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
import { archetypes } from '@/lib/archetypes';
import { archetypeAkutars } from '@/lib/akutars';
import { ArchetypeSchema } from '@/lib/validation';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const FormatSchema = z.enum(['square', 'landscape']).default('square');

// Cache fonts in module scope
let fontCache: { name: string; data: ArrayBuffer; weight: number; style: string }[] | null = null;

function getFonts() {
  if (fontCache) return fontCache;
  const fontsDir = path.join(process.cwd(), 'public', 'fonts');
  const bebasData = fs.readFileSync(path.join(fontsDir, 'BebasNeue-Regular.ttf'));
  const barlowData = fs.readFileSync(path.join(fontsDir, 'BarlowCondensed-Regular.ttf'));
  const barlowBoldData = fs.readFileSync(path.join(fontsDir, 'BarlowCondensed-Bold.ttf'));
  const barlowItalicData = fs.readFileSync(path.join(fontsDir, 'BarlowCondensed-Italic.ttf'));
  fontCache = [
    { name: 'Bebas Neue', data: bebasData.buffer.slice(bebasData.byteOffset, bebasData.byteOffset + bebasData.byteLength), weight: 400, style: 'normal' },
    { name: 'Barlow Condensed', data: barlowData.buffer.slice(barlowData.byteOffset, barlowData.byteOffset + barlowData.byteLength), weight: 400, style: 'normal' },
    { name: 'Barlow Condensed', data: barlowBoldData.buffer.slice(barlowBoldData.byteOffset, barlowBoldData.byteOffset + barlowBoldData.byteLength), weight: 700, style: 'normal' },
    { name: 'Barlow Condensed', data: barlowItalicData.buffer.slice(barlowItalicData.byteOffset, barlowItalicData.byteOffset + barlowItalicData.byteLength), weight: 400, style: 'italic' },
  ];
  return fontCache;
}

// NFT images are loaded via direct URL by ImageResponse/satori

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const archetypeResult = ArchetypeSchema.safeParse(searchParams.get('archetype'));
    if (!archetypeResult.success) return NextResponse.json({ error: 'Invalid archetype' }, { status: 400 });

    const formatResult = FormatSchema.safeParse(searchParams.get('format') || 'square');
    const archetypeId = archetypeResult.data;
    const format = formatResult.success ? formatResult.data : 'square' as const;
    const archetype = archetypes[archetypeId];
    const nfts = archetypeAkutars[archetypeId];
    const nft = nfts?.[0];

    const fonts = getFonts();
    // Use NFT image URL with explicit PNG format (OpenSea CDN defaults to avif which satori can't handle)
    const nftImg = nft?.image ? nft.image + '&format=png' : '';

    const isSquare = format === 'square';
    const w = isSquare ? 1080 : 1200;
    const h = isSquare ? 1080 : 630;
    const name = archetype.name.toUpperCase();
    const shortName = archetype.name.replace('The ', '');
    const tokenId = nft?.tokenId ?? '0000';
    const imgSize = isSquare ? 320 : 280;

    const nftElement = nftImg ? (
      <div style={{ width: imgSize, height: imgSize, borderRadius: 8, overflow: 'hidden', border: '2px solid rgba(0,212,255,0.4)', boxShadow: '0 0 30px rgba(0,212,255,0.2)', marginBottom: isSquare ? 16 : 12, display: 'flex' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={nftImg} width={imgSize} height={imgSize} style={{ objectFit: 'cover' }} alt="" />
      </div>
    ) : (
      <div style={{ width: imgSize, height: imgSize, borderRadius: 8, border: '2px solid rgba(0,212,255,0.2)', background: 'rgba(0,212,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: isSquare ? 16 : 12 }}>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: isSquare ? 48 : 40, color: 'rgba(0,212,255,0.3)' }}>AKU</div>
      </div>
    );

    const element = isSquare ? (
      <div style={{ width: 1080, height: 1080, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, #0d1a2e 0%, #060a12 40%, #060a12 100%)', fontFamily: 'Barlow Condensed', padding: 60, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 320, left: 290, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
        <div style={{ color: '#00d4ff', fontSize: 18, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 20 }}>Mission Complete — Your Akutar Is</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.5))' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
          <div style={{ width: 80, height: 1, background: 'linear-gradient(to left, transparent, rgba(0,212,255,0.5))' }} />
        </div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 96, color: 'white', letterSpacing: '0.04em', marginTop: 16, marginBottom: 8 }}>{name}</div>
        <div style={{ fontSize: 28, color: '#fbbf24', fontStyle: 'italic', marginBottom: 40 }}>{`"${archetype.tagline}"`}</div>
        {nftElement}
        <div style={{ color: 'rgba(0,212,255,0.7)', fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 40 }}>{`Akutar #${tokenId} — ${shortName} Spirit`}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>AKU</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, letterSpacing: '0.1em' }}>Discover Your Akutar</div>
        </div>
      </div>
    ) : (
      <div style={{ width: 1200, height: 630, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #0d1a2e 0%, #060a12 50%, #060a12 100%)', fontFamily: 'Barlow Condensed', padding: 60, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 80, right: 180, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 50 }}>
          <div style={{ color: '#00d4ff', fontSize: 16, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16 }}>Mission Complete</div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 72, color: 'white', letterSpacing: '0.04em', marginBottom: 8, lineHeight: 1 }}>{name}</div>
          <div style={{ fontSize: 24, color: '#fbbf24', fontStyle: 'italic', marginBottom: 32 }}>{`"${archetype.tagline}"`}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 'auto' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>AKU</div>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, letterSpacing: '0.1em' }}>Discover Your Akutar</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {nftElement}
          <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{`Akutar #${tokenId}`}</div>
        </div>
      </div>
    );

    return new ImageResponse(element, {
      width: w,
      height: h,
      fonts: fonts as { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: 'normal' | 'italic' }[],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('OG image error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
