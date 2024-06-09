import { Category } from './enums';

interface Genre {
  name: string;
  subgenre?: Genre[];
}

type Genres = {
  [key in Category]: Genre[];
};

export const genres: Genres = {
  fiction: [
    {
      name: 'general-fiction',
      subgenre: [
        { name: 'literary-fiction' },
        { name: 'historical-fiction' },
        { name: 'contemporary-fiction' },
      ],
    },
    {
      name: 'speculative-fiction',
      subgenre: [
        {
          name: 'science-fiction',
          subgenre: [
            { name: 'hard-science-fiction' },
            { name: 'soft-science-fiction' },
            { name: 'space-opera' },
            { name: 'cyberpunk' },
            { name: 'steampunk' },
            { name: 'time-travel' },
            { name: 'military-science-fiction' },
            { name: 'dystopian' },
            { name: 'utopian' },
            { name: 'apocalyptic-post-apocalyptic' },
          ],
        },
        {
          name: 'fantasy',
          subgenre: [
            { name: 'high-epic-fantasy' },
            { name: 'low-fantasy' },
            { name: 'urban-fantasy' },
            { name: 'dark-fantasy' },
            { name: 'sword-and-sorcery' },
            { name: 'fairy-tales' },
            { name: 'magical-realism' },
          ],
        },
        {
          name: 'horror',
          subgenre: [
            { name: 'gothic-horror' },
            { name: 'supernatural-horror' },
            { name: 'psychological-horror' },
            { name: 'lovecraftian-horror' },
            { name: 'monster-horror' },
            { name: 'splatterpunk' },
          ],
        },
      ],
    },
    {
      name: 'mystery-and-crime',
      subgenre: [
        {
          name: 'mystery',
          subgenre: [
            { name: 'cozy-mystery' },
            { name: 'hard-boiled-mystery' },
            { name: 'police-procedural' },
            { name: 'detective-fiction' },
            { name: 'legal-thriller' },
          ],
        },
        {
          name: 'crime',
          subgenre: [
            { name: 'noir' },
            { name: 'heist' },
            { name: 'true-crime' },
          ],
        },
      ],
    },
    {
      name: 'thriller-and-suspense',
      subgenre: [
        {
          name: 'thriller',
          subgenre: [
            { name: 'psychological-thriller' },
            { name: 'crime-thriller' },
            { name: 'spy-thriller' },
            { name: 'techno-thriller' },
            { name: 'medical-thriller' },
            { name: 'legal-thriller' },
          ],
        },
        {
          name: 'suspense',
          subgenre: [
            { name: 'domestic-suspense' },
            { name: 'political-thriller' },
          ],
        },
      ],
    },
    {
      name: 'romance',
      subgenre: [
        { name: 'contemporary-romance' },
        { name: 'historical-romance' },
        { name: 'romantic-suspense' },
        { name: 'paranormal-romance' },
        { name: 'fantasy-romance' },
        { name: 'science-fiction-romance' },
        { name: 'erotic-romance' },
        { name: 'young-adult-romance' },
      ],
    },
    {
      name: 'young-adult',
      subgenre: [
        { name: 'ya-fantasy' },
        { name: 'ya-science-fiction' },
        { name: 'ya-contemporary' },
        { name: 'ya-dystopian' },
        { name: 'ya-paranormal' },
        { name: 'ya-romance' },
      ],
    },
    {
      name: 'children-fiction',
      subgenre: [
        { name: 'middle-grade' },
        { name: 'picture-books' },
        { name: 'chapter-books' },
        { name: 'young-adult' },
      ],
    },
    {
      name: 'other-fiction-genres',
      subgenre: [
        { name: 'adventure' },
        { name: 'action' },
        { name: 'western' },
        { name: 'inspirational' },
        { name: 'chick-lit' },
        { name: 'satire' },
        { name: 'humor' },
        { name: 'war-military' },
        { name: 'urban-fiction' },
        { name: 'epic' },
      ],
    },
    {
      name: 'cross-genre',
      subgenre: [
        { name: 'historical-fantasy' },
        { name: 'science-fantasy' },
        { name: 'romantic-thriller' },
        { name: 'fantasy-horror' },
        { name: 'historical-mystery' },
      ],
    },
  ],
  'non-fiction': [
    {
      name: 'general-non-fiction',
      subgenre: [
        { name: 'biography' },
        { name: 'autobiography' },
        { name: 'memoir' },
        { name: 'essay' },
        { name: 'journalism' },
        { name: 'narrative-non-fiction' },
      ],
    },
    {
      name: 'history',
      subgenre: [
        { name: 'ancient-history' },
        { name: 'medieval-history' },
        { name: 'modern-history' },
        { name: 'military-history' },
        { name: 'cultural-history' },
        { name: 'social-history' },
        { name: 'political-history' },
      ],
    },
    {
      name: 'science-and-nature',
      subgenre: [
        { name: 'popular-science' },
        { name: 'natural-history' },
        { name: 'environmental' },
        { name: 'astronomy' },
        { name: 'biology' },
        { name: 'physics' },
        { name: 'chemistry' },
        { name: 'geology' },
        { name: 'botany' },
        { name: 'zoology' },
      ],
    },
    {
      name: 'self-help-and-personal-development',
      subgenre: [
        { name: 'motivational' },
        { name: 'inspirational' },
        { name: 'personal-growth' },
        { name: 'health-and-wellness' },
        { name: 'psychology' },
        { name: 'productivity' },
      ],
    },
    {
      name: 'business-and-economics',
      subgenre: [
        { name: 'entrepreneurship' },
        { name: 'leadership' },
        { name: 'management' },
        { name: 'finance' },
        { name: 'economics' },
        { name: 'marketing' },
        { name: 'investing' },
      ],
    },
    {
      name: 'arts-and-entertainment',
      subgenre: [
        { name: 'music' },
        { name: 'film' },
        { name: 'theatre' },
        { name: 'dance' },
        { name: 'photography' },
        { name: 'visual-arts' },
        { name: 'performing-arts' },
      ],
    },
    {
      name: 'travel',
      subgenre: [
        { name: 'travel-guide' },
        { name: 'travel-memoir' },
        { name: 'adventure-travel' },
      ],
    },
    {
      name: 'true-crime',
      subgenre: [
        { name: 'investigative-journalism' },
        { name: 'courtroom-drama' },
        { name: 'criminal-profiles' },
      ],
    },
    {
      name: 'food-and-drink',
      subgenre: [
        { name: 'cookbooks' },
        { name: 'food-writing' },
        { name: 'beverages' },
        { name: 'gastronomy' },
      ],
    },
    {
      name: 'health-and-fitness',
      subgenre: [
        { name: 'nutrition' },
        { name: 'exercise' },
        { name: 'medical' },
      ],
    },
    {
      name: 'sports',
      subgenre: [
        { name: 'athlete-biographies' },
        { name: 'sports-history' },
        { name: 'sports-guides' },
      ],
    },
    {
      name: 'religion-and-spirituality',
      subgenre: [
        { name: 'religious-texts' },
        { name: 'spiritual-guidance' },
        { name: 'philosophy' },
        { name: 'theology' },
      ],
    },
    {
      name: 'education-and-reference',
      subgenre: [
        { name: 'textbooks' },
        { name: 'dictionaries' },
        { name: 'encyclopedias' },
        { name: 'study-guides' },
      ],
    },
    {
      name: 'home-and-garden',
      subgenre: [
        { name: 'home-improvement' },
        { name: 'gardening' },
        { name: 'interior-design' },
      ],
    },
    {
      name: 'crafts-and-hobbies',
      subgenre: [
        { name: 'diy' },
        { name: 'crafts' },
        { name: 'collecting' },
        { name: 'gaming' },
      ],
    },
    {
      name: 'technology-and-computing',
      subgenre: [
        { name: 'programming' },
        { name: 'information-technology' },
        { name: 'cybersecurity' },
      ],
    },
    {
      name: 'politics-and-social-sciences',
      subgenre: [
        { name: 'political-science' },
        { name: 'sociology' },
        { name: 'anthropology' },
        { name: 'cultural-studies' },
        { name: 'gender-studies' },
        { name: 'law' },
      ],
    },
    {
      name: 'miscellaneous',
      subgenre: [
        { name: 'humor' },
        { name: 'essays' },
        { name: 'letters' },
        { name: 'diaries' },
      ],
    },
  ],
};

export const validateGenrePath = (
  genres: Genre[],
  steps: string[],
): boolean => {
  const localSteps = [...steps];

  const step = localSteps.shift();
  const genre = genres.find((g) => g.name === step);
  if (genre === undefined) {
    return false;
  }

  return localSteps.length !== 0
    ? validateGenrePath(genre.subgenre, localSteps)
    : true;
};
