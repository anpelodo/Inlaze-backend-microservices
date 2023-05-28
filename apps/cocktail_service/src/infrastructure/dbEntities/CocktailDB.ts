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
  notes: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => IngredientDB, (ingredient) => ingredient.cocktails)
  @JoinTable()
  ingredients: IngredientDB[];
}
