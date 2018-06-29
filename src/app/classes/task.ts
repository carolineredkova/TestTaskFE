export class Task {
  id: number;
	description: string;
	isActive: boolean;

  constructor(id: number, description: string) {
    this.id = id;
		this.description = description;
		this.isActive = false;
	}
}
