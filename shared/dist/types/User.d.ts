import Cohorte from './Cohorte';
import Role from './Role';
export default interface User {
    id: number;
    givenName: string;
    familyName: string;
    nickName: string;
    email: string;
    googleId: string;
    githubId: string;
    photoUrl: string;
    roles: Array<Role>;
    cohortes: Array<Cohorte>;
}
