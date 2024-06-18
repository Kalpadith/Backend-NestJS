import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async create(post: Partial<Post>): Promise<Post> {
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: Partial<Post>): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }
  
}

