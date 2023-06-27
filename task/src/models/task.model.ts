import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface TaskAttrs {
  title: string;
  description: string;
  userId:string
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

// An interface that describes the properties
// that a User Document has
interface TaskDoc extends mongoose.Document {
  title: string;
  description: string;
  userId:string
}

const taskSchema = new mongoose.Schema(
  {
    title: {
          
      type: String,
      required: true
          
    },
    
    description: {
          
      type: String,
      required: true
            
    },
        
    userId: {

      type: String,
      required:true

    } 
    
      
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);



taskSchema.statics.build = (attrs: TaskAttrs) => {

  return new Task(attrs);
  
};

const Task = mongoose.model<TaskDoc, UserModel>('Task', taskSchema);

export { Task };
