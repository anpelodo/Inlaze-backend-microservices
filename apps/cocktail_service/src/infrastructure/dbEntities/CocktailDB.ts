import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IngredientDB } from "./IngredientDB";

@Entity({ name: "cocktails" })
export class CocktailDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  instructions: string;

  @Column({ name: "additional_notes" })
  additionalNotes: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToMany(() => IngredientDB, (ingredient) => ingredient.cocktails, {
    cascade: true,
  })
  @JoinTable()
  ingredients: IngredientDB[];
}
