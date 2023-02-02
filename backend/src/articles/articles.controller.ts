import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Article } from 'src/articles/articles.model';
import { ArticlesService } from 'src/articles/articles.service';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/articles/dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  getArticles(): Article[] {
    return this.articleService.getArticles();
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto): Article {
    return this.articleService.createArticle(createArticleDto);
  }

  @Get(':id')
  getArticleById(@Param('id') id: string): Article {
    return this.articleService.getArticleById(id);
  }

  @Put(':id')
  updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Article {
    return this.articleService.updateArticle(id, updateArticleDto);
  }
}
