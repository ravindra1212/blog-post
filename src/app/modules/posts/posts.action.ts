import { Post } from './posts.interface';

export class AddPost {

    static readonly type = '[Post] Add';

    constructor(public payload: Post) {}
}

export class GetPosts {
    static readonly type = '[Post] Get';
}

export class UpdatePost {

    static readonly type = '[Post] Update';

    constructor(public payload: Post, public id: string) {}
}

export class DeletePost {

    static readonly type = '[Post] Delete';

    constructor(public id: string) {}
}

export class SetSelectedPost {

    static readonly type = '[Post] Set';

    constructor(public payload: Post | undefined) {}
}