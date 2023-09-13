import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  HasManyCreateAssociationMixin,
  Association
} from 'sequelize';
// import { ForumTopic } from './ForumTopic';

interface ForumAttributes {
  id: number;
  forumCategoryId: number;
  sort: number;
  name: string;
  description?: string;
  minClassRead: number;
  minClassWrite: number;
  minClassCreate: number;
  numTopics: number;
  numPosts: number;
  autoLock: boolean;
  autoLockWeeks: number;
  lastTopicId?: number;
}

interface ForumCreationAttributes extends Optional<ForumAttributes, 'id'> {}

class Forum extends Model<ForumAttributes, ForumCreationAttributes> {
  public id!: number;
  public forumCategoryId!: number;
  public sort!: number;
  public name!: string;
  public description?: string;
  public minClassRead!: number;
  public minClassWrite!: number;
  public minClassCreate!: number;
  public numTopics!: number;
  public numPosts!: number;
  public autoLock!: boolean;
  public autoLockWeeks!: number;
  public lastTopicId?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Forum has many ForumTopic
  public getForumTopics!: HasManyCreateAssociationMixin<ForumTopic>;
  public static associations: {
    forumTopics: Association<Forum, ForumTopic>;
  };
}

const initForumModel = (sequelize: Sequelize) => {
  Forum.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      forumCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'forum_categories',
          key: 'id'
        }
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      minClassRead: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      minClassWrite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      minClassCreate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      numTopics: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      numPosts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      autoLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      autoLockWeeks: {
        type: DataTypes.INTEGER,
        defaultValue: 4
      },
      lastTopicId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'forum_topics',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      tableName: 'forums',
      modelName: 'Forum',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: true
    }
  );
  return Forum;
};

export { Forum, initForumModel };
