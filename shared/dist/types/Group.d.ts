import User from './User';
import GroupTypes from './GroupTypes';
export default interface Group {
    id: number;
    name: string;
    type: GroupTypes;
    instructor: User;
    pms: Array<User>;
    staff: Array<User>;
    students: Array<User>;
    parent: Group;
}
