import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { CocktailDB } from "./CocktailDB";

@Entity({ name: "ingredients" })
export class IngredientDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;

  @ManyToMany(() => CocktailDB, (cocktail) => cocktail.ingredients)
  cocktails: CocktailDB[];
}
