import 'server-only'
 
export type LocaleDict = {
  common: {
    sourceCode: string;
    browse: string;
    search: string;
    keyword: string;
    copy: string;
    share: string;
  };
  landing: {
    browseAll: string;
    feelingLucky: string;
  };
  toast: {
    copy: {
      title: string;
      description: string;
    };
    share: {
      title: string;
      description: string;
    };
  };
}

export type SupportedLang = 'en' | 'de' | 'fr' | 'es' | 'jp';

const dictionaries= {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  jp: () => import('@/dictionaries/jp.json').then((module) => module.default),
}
 
export const getDictionary = async (lang: SupportedLang): Promise<LocaleDict> =>
  dictionaries[lang]()