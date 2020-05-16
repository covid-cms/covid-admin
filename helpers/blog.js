import blogConfig from '@/config/blog';

export function articleStatusTitle (statusId) {
    let articleStatus = blogConfig.articleStatus;
    let status = articleStatus.find(status => status.id == statusId);

    return status.title;
}
