
import Post from '../model/post.js';

const url = 'http://localhost:8000';

export const createPost = async (request, response) => {
    try {
        console.log('Request body:', request.body);
        console.log('Request file:', request.file);
        
        // Validate required fields
        if (!request.body.title || !request.body.description || !request.body.username) {
            return response.status(400).json({ 
                msg: 'Title, description, and username are required',
                received: request.body
            });
        }
        
        const postData = {
            title: request.body.title.trim(),
            description: request.body.description.trim(),
            categories: request.body.categories?.trim() || 'All',
            username: request.body.username.trim(),
            createdDate: new Date()
        };
        
        // Add image URL if file was uploaded
        if (request.file) {
            postData.picture = `${url}/file/${request.file.filename}`;
            console.log('Image URL set to:', postData.picture);
        }
        
        const post = new Post(postData);
        await post.save();

        response.status(200).json({ msg: 'Post saved successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        response.status(500).json({ 
            msg: 'Error while saving post', 
            error: error.message,
            details: error.toString()
        });
    }
}

export const updatePost = async (request, response) => {
    try {
        
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }
        
        const updateData = {};
        
        // Update fields only if provided
        if (request.body.title) updateData.title = request.body.title.trim();
        if (request.body.description) updateData.description = request.body.description.trim();
        if (request.body.categories) updateData.categories = request.body.categories.trim();
        if (request.body.username) updateData.username = request.body.username.trim();
        
        // Update image URL only if new file was uploaded
        if (request.file) {
            updateData.picture = `${url}/file/${request.file.filename}`;
            console.log('Updated image URL to:', updateData.picture);
        }
        
        await Post.findByIdAndUpdate(request.params.id, { $set: updateData });

        response.status(200).json({ msg: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        response.status(500).json({ 
            msg: 'Error while updating post', 
            error: error.message,
            details: error.toString()
        });
    }
}

export const deletePost = async (request, response) => {
    try {
        console.log('Delete request - ID:', request.params.id);
        console.log('User:', request.user);
        
        if (!request.params.id) {
            return response.status(400).json({ msg: 'Post ID is required' });
        }
        
        const post = await Post.findById(request.params.id);
        
        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }

        await post.deleteOne();

        response.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        response.status(500).json({ 
            msg: 'Error while deleting post', 
            error: error.message,
            details: error.toString()
        });
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }

        response.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        response.status(500).json({ msg: 'Error while fetching post', error: error.message });
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if (username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        response.status(500).json({ msg: 'Error while fetching posts', error: error.message });
    }
}