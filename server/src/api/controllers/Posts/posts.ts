import * as service from "../../services/PostService";
import { createPostsDto, FilterPostsDto, updatePostsDto } from "../../../database/dto/posts.dto";
import { Post } from "../../interfaces/posts.interface";
import * as mapper from "./postsMappers";
import { Request, Response, NextFunction } from "express";


const sendNewPostToDatabase = async (payload: createPostsDto): Promise<Post> => {
    const mapNewPost = mapper.toPost(await service.create(payload))
    return mapNewPost
}

exports.createPost = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body }
    try {
        await sendNewPostToDatabase(data)
        return res.status(201).json({ message: "Nouveau post créé !"});
    }
    catch (error) {
        return res.status(500).json( error );
    }
}

const sendUpdatedPost = async (id: number, payload: updatePostsDto): Promise<Post> => {
    const mapUpdatedPost = mapper.toPost(await service.update(id, payload));
    return mapUpdatedPost
}

exports.updatePost = async () => {

}

const SelectSpecificPost = async (id: number): Promise<Post> =>  {
    const mapSelectSpecificPost = mapper.toPost(await service.getPostsById(id));
    return mapSelectSpecificPost
}

exports.getPostById = async () => {

}

const sendDeletionOrder = async (id: number): Promise<Boolean> => {
    const isDeleted = await service.deletePostById(id);
    return isDeleted
}

exports.deletePostById = async () => {

}

const selectAllPosts = async (filters: FilterPostsDto): Promise<Post[]> => {
    return (await service.getAllPosts((filters))).map(mapper.toPost);
}

exports.getAllPosts = async () => {

}