import User from './User';
import Group from './Group';
export default interface Cohorte {
    id: number;
    name: string;
    startDate: string;
    instructor: User;
    users: Array<User>;
    groups: Array<Group>;
}
