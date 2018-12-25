import { BrassagemEntity } from './brassagem-entity';
import { FervuraEntity } from './fervura-entity';

export class ReceitaEntity{
   descricaoReceita: string;
   brassagens: BrassagemEntity;
   fervuras: FervuraEntity;
}