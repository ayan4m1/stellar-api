import { Model, DataTypes } from 'sequelize';
class Forum extends Model {
    id;
    forumCategoryId;
    sort;
    name;
    description;
    minClassRead;
    minClassWrite;
    minClassCreate;
    numTopics;
    numPosts;
    autoLock;
    autoLockWeeks;
    lastTopicId;
    // timestamps!
    createdAt;
    updatedAt;
    // Forum has many ForumTopic
    getForumTopics;
    static associations;
}
const initForumModel = (sequelize) => {
    Forum.init({
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
    }, {
        sequelize,
        tableName: 'forums',
        modelName: 'Forum',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    });
    return Forum;
};
export { Forum, initForumModel };
