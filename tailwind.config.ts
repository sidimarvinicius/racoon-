// Mensagens bíblicas de Jesus para inspirar os usuários do Echo
export const biblicalMessages = [
  {
    text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    reference: "Mateus 11:28",
    context: "Para quem está cansado e precisa de apoio",
  },
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
    context: "Para quem busca propósito e significado",
  },
  {
    text: "Portanto, não vos inquieteis pelo dia de amanhã; porque o dia de amanhã cuidará de si mesmo. Basta a cada dia o seu mal.",
    reference: "Mateus 6:34",
    context: "Para quem tem ansiedade sobre o futuro",
  },
  {
    text: "Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de prudência.",
    reference: "2 Timóteo 1:7",
    context: "Para quem precisa de coragem e força",
  },
  {
    text: "Porque tudo é possível àquele que crê.",
    reference: "Marcos 9:23",
    context: "Para quem busca motivação e esperança",
  },
  {
    text: "Bem-aventurados os misericordiosos, porque alcançarão misericórdia.",
    reference: "Mateus 5:7",
    context: "Para quem quer melhorar seus relacionamentos",
  },
  {
    text: "Porque o fruto do Espírito é: amor, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão, domínio próprio.",
    reference: "Gálatas 5:22-23",
    context: "Para quem busca equilíbrio emocional",
  },
  {
    text: "Não tenho outro desejo senão aquele que está em meu coração: ver vocês prosperar em tudo, assim como prospera a sua vida espiritual.",
    reference: "3 João 1:2",
    context: "Para quem quer saúde integral",
  },
  {
    text: "Lançai sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    reference: "1 Pedro 5:7",
    context: "Para quem sofre com ansiedade",
  },
  {
    text: "Bem-aventurados os que choram, porque serão consolados.",
    reference: "Mateus 5:4",
    context: "Para quem está em momento difícil",
  },
  {
    text: "Porque em tudo podeis estar certos, por sua graça, que ele realiza tudo que você tiver necessidade.",
    reference: "Filipenses 4:19",
    context: "Para confiança financeira e provisão",
  },
  {
    text: "A graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo estejam com todos vós.",
    reference: "2 Coríntios 13:14",
    context: "Bênção final de paz e amor",
  },
];

// Função para obter uma mensagem aleatória
export function getRandomBiblicalMessage() {
  return biblicalMessages[Math.floor(Math.random() * biblicalMessages.length)];
}

// Função para obter mensagem por contexto
export function getBiblicalMessageByContext(context: string) {
  const message = biblicalMessages.find((msg) =>
    msg.context.toLowerCase().includes(context.toLowerCase())
  );
  return message || getRandomBiblicalMessage();
}

// Função para obter todas as mensagens
export function getAllBiblicalMessages() {
  return biblicalMessages;
}
