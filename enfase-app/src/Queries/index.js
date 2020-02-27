import { gql } from 'apollo-boost';

/*
Neste arquivo está descritos as Operacoes
de CRUD para fazer querys e mutations nas
Perguntas salvas no banco de dados.
*/
export const GET_QUESTOES = gql`
  {
    getQuestoes {
      ID,
      PERGUNTA,
      ALTERNATIVAA,
      ALTERNATIVAB,
      ALTERNATIVAC,
      ALTERNATIVAD
    }
  }
`;

export const VIEW_QUESTAO = gql`
  query ($id: Int){
    getQuestaoInfo(ID: $id) {
      ID,
      PERGUNTA,
      ALTERNATIVAA,
      ALTERNATIVAB,
      ALTERNATIVAC,
      ALTERNATIVAD
    }
  }
`;

export const ADD_QUESTAO = gql`
  mutation($pergunta: String, $alternativaa: String, $alternativab: String
            , $alternativac: String, $alternativad: String) {
    createQuestao (PERGUNTA: $pergunta, ALTERNATIVAA: $alternativaa, ALTERNATIVAB: $alternativab,
                                    ALTERNATIVAC: $alternativac, ALTERNATIVAD: $alternativad)
  }
`;

export const EDIT_QUESTAO = gql`
  mutation($id: Int, $pergunta: String, $alternativaa: String, $alternativab: String
            , $alternativac: String, $alternativad: String) {
    updateQuestaoInfo (ID: $id, PERGUNTA: $pergunta, ALTERNATIVAA: $alternativaa, ALTERNATIVAB: $alternativab,
                                    ALTERNATIVAC: $alternativac, ALTERNATIVAD: $alternativad)
  }
`;

export const DELETE_QUESTAO = gql`
  mutation($id: Int) {
      deleteQuestao(ID: $id)
  }
`