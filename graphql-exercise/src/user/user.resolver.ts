// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
// import { UserService } from './user.service';
// import { User } from './user.entity';
// import { CreateUserInput } from './dto/create-user.input';

// @Resolver(() => User)
// export class UserResolver {
//   constructor(private readonly userService: UserService) {}

//   @Query(() => [User])
//   async users() {
//     return this.userService.findAll();
//   }

//   @Query(() => User)
//   async user(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.findOne(id);
//   }

//   @Mutation(() => User)
//   async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
//     const user = new User();
//     user.name = createUserInput.name;
//     user.email = createUserInput.email;
//     user.password = createUserInput.password;
//     return this.userService.create(user);
//   }

//   @Mutation(() => Boolean)
//   async removeUser(@Args('id', { type: () => Int }) id: number) {
//     await this.userService.remove(id);
//     return true;
//   }

//   @Mutation(() => User)
//   async updateUser(
//     @Args('id', { type: () => Int }) id: number,
//     @Args('name') name: string,
//     @Args('email') email: string,
//   ) {
//     const user = await this.userService.findOne(id);
//     if (user) {
//       user.name = name;
//       user.email = email;
//       return this.userService.update(id, user);
//     }
//     return null;
//   }
// }

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = new User();
    user.name = createUserInput.name;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    return this.userService.create(user);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    await this.userService.remove(id);
    return true;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.name = name;
    user.email = email;
    await this.userService.update(id, user);
    return user;
  }
}



