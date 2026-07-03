import Todo from '../models/todo.js';

export const createTodo = async (req, res) => {
    try {
        const { title, desc, completed } = req.body;

        // Create a new todo item
        const todo = await Todo.create({ title, desc, completed ,user:req.user.userId});

        res.json({ message: "Todo created successfully", todo });
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};


export const deleteTodo = async (req, res) => {
    
    try{
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or you are not authorized to delete it' });
        }
        res.json({ message: 'Todo deleted successfully' });

    } catch (error) {
        res.status(500).json({ errors: error.message });
    }




};


export const updateTodo = async (req, res) => {
    try{
        const{ id } = req.params;
        const { title, desc, completed } = req.body;

        const todo = await Todo.findOneAndUpdate(
            { _id: id, user: req.user.userId },
            { title, desc, completed },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found or you are not authorized to update it' });
        }

        res.status(200).json({ message: 'Todo updated successfully', todo });

    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
};



};

export const allTodos = async (req, res) => {




    


};