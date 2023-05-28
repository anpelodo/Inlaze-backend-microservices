import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { CocktailDB } from "./CocktailDB";

@Entity({ name: "ingredients" })
export class IngredientDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @ManyToMany(() => CocktailDB, (cocktail) => cocktail.ingredients)
  cocktails: CocktailDB[];
}
