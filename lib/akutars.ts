// Real Akutar NFT images sourced from OpenSea CDN (i2c.seadn.io)
// Token IDs from the live collection: opensea.io/collection/akutars

const BASE = 'https://i2c.seadn.io/ethereum/0xaad35c2dadbe77f97301617d82e661776c891fa9';
const OS   = 'https://opensea.io/assets/ethereum/0xaad35c2dadbe77f97301617d82e661776c891fa9';

// Tiny base64 blur placeholder for NFT images (dark space-themed)
export const NFT_BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJklEQVQYV2N89+7dfwYGBgZGRkYGJgYKACMDFYCRgQrAyEAeAABY+AT/cGpMhAAAAABJRU5ErkJggg==';

export interface AkutarNFT {
  tokenId: string;
  image: string;
  openseaUrl: string;
}

// 16 confirmed live images (all HTTP 200 from OpenSea CDN)
export const allFeaturedAkutars: AkutarNFT[] = [
  { tokenId: '11128', image: `${BASE}/2d5a2ad468441df5e6fa2febe8eccbb6.png?w=500`, openseaUrl: `${OS}/11128` },
  { tokenId: '9116',  image: `${BASE}/c5494f7f567bc5d91c58761f5c97b0d3.png?w=500`, openseaUrl: `${OS}/9116`  },
  { tokenId: '5693',  image: `${BASE}/229bea5a321d9b04cd67d031d30445cf.png?w=500`, openseaUrl: `${OS}/5693`  },
  { tokenId: '5255',  image: `${BASE}/fd850655f690a1744f0a958557e1cdf9.png?w=500`, openseaUrl: `${OS}/5255`  },
  { tokenId: '6657',  image: `${BASE}/b3f5486ded07dfd562716a5d2692d1f2.png?w=500`, openseaUrl: `${OS}/6657`  },
  { tokenId: '10774', image: `${BASE}/77eabd113cc9ce57c0c776ec6733c399.png?w=500`, openseaUrl: `${OS}/10774` },
  { tokenId: '8505',  image: `${BASE}/32dbcacf1a7331d2314eeb437c6d4bce.png?w=500`, openseaUrl: `${OS}/8505`  },
  { tokenId: '7799',  image: `${BASE}/4138b2b69e4ce34f2de8cd0aa3239aaf.png?w=500`, openseaUrl: `${OS}/7799`  },
  { tokenId: '3964',  image: `${BASE}/f03f5d946e75c12126c86ed6841f120e.png?w=500`, openseaUrl: `${OS}/3964`  },
  { tokenId: '8350',  image: `${BASE}/705ef65e2f75420ac1d592283841d118.png?w=500`, openseaUrl: `${OS}/8350`  },
  { tokenId: '8506',  image: `${BASE}/8d258ee62512e02498c18fff24c7424a.png?w=500`, openseaUrl: `${OS}/8506`  },
  { tokenId: '3832',  image: `${BASE}/23bc69cb1c200a3e200047a2f582b2c0.png?w=500`, openseaUrl: `${OS}/3832`  },
  { tokenId: '3833',  image: `${BASE}/fbdfd6671a91ce7dc8109cf82ef46f4b.png?w=500`, openseaUrl: `${OS}/3833`  },
  { tokenId: '8349',  image: `${BASE}/d12a6d5a674d00aed3747ff8397c13d4.png?w=500`, openseaUrl: `${OS}/8349`  },
  { tokenId: '3769',  image: `${BASE}/8bf942f98cf55bb4e0455b00c35ddbb7.png?w=500`, openseaUrl: `${OS}/3769`  },
  { tokenId: '3770',  image: `${BASE}/d49faa5e697d23fab8e756e886bdbe22.png?w=500`, openseaUrl: `${OS}/3770`  },
];

// 2 Akutars matched to each of the 8 archetypes
export const archetypeAkutars: Record<string, AkutarNFT[]> = {
  explorer:  [allFeaturedAkutars[0],  allFeaturedAkutars[1]],   // #11128, #9116
  engineer:  [allFeaturedAkutars[2],  allFeaturedAkutars[3]],   // #5693,  #5255
  commander: [allFeaturedAkutars[4],  allFeaturedAkutars[5]],   // #6657,  #10774
  scientist: [allFeaturedAkutars[6],  allFeaturedAkutars[7]],   // #8505,  #7799
  dreamer:   [allFeaturedAkutars[8],  allFeaturedAkutars[9]],   // #3964,  #8350
  guardian:  [allFeaturedAkutars[10], allFeaturedAkutars[11]],  // #8506,  #3832
  innovator: [allFeaturedAkutars[12], allFeaturedAkutars[13]],  // #3833,  #8349
  pilot:     [allFeaturedAkutars[14], allFeaturedAkutars[15]],  // #3769,  #3770
};

// 8 images for the homepage gallery (one per archetype)
export const homepageGallery: AkutarNFT[] = allFeaturedAkutars.filter((_, i) => i % 2 === 0);

// Single floating companion for the quiz (cycles through)
export const quizCompanions: AkutarNFT[] = allFeaturedAkutars.slice(0, 8);
