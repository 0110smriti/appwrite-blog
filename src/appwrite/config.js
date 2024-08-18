import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite error :: getPost()", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteProjectId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite error :: getPosts()", error);
      return false;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite error :: createPost()", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite error :: updatePost()", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error :: deletePost()", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      console.log("Appwrite error :: uploadFile()", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.createFile(config.appwriteBucketId, fileId)
    } catch (error) {
      console.log("Appwrite error :: deleteFile()", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.getFilePreview(config.appwriteBucketId, fileId).href
  }
}


const service = new Service()

export default service