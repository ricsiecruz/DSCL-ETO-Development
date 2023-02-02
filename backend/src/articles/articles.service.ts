import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from 'src/articles/articles.model';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  getArticles(): Article[] {
    return this.articles;
  }

  createArticle({ userId, title, body }: CreateArticleDto): Article {
    const article: Article = {
      id: uuid(),
      userId,
      title,
      body,
      date: new Date().getTime(),
    };

    this.articles.push(article);

    return article;
  }

  getArticleById(id: string): Article {
    const found = this.articles.find((article) => article.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  updateArticle(id: string, updateArticleDto: UpdateArticleDto): Article {
    this.getArticleById(id);

    const payload = { ...updateArticleDto };

    for (const key in payload) {
      if (!payload[key]) {
        delete payload[key];
      }
    }

    this.articles = this.articles.map((article) => {
      if (article.id === id) {
        if (payload.date) {
          payload.date = new Date(payload.date).getTime();
        }
        return { ...article, ...payload };
      }
      return article;
    });

    return this.getArticleById(id);
  }
}
