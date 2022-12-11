import { Ingredient } from './ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: Ingredient[];
  public key?: string;

  constructor(
    name: string,
    description: string,
    imgPath: string,
    ingredient: Ingredient[],
    key?: string
  ) {
    this.name = name;
    this.description = description;
    this.imgPath = imgPath;
    this.ingredients = ingredient;
    this.key = key;
  }
}
