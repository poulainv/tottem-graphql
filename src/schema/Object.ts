import { enumType, objectType } from 'nexus'

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.authUserId()
        t.model.biography()
        t.model.pictureUrl()
        t.model.label()
        t.model.firstname()
        t.model.sections()
        t.model.website()
        t.model.linkedin()
        t.model.youtube()
        t.model.mail()
        t.model.github()
    },
})

export const Section = objectType({
    name: 'Section',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.index()
        t.model.name()
        t.model.collections({ filtering: { isDeleted: true } })
        t.model.isExpanded()
    },
})

export const Collection = objectType({
    name: 'Collection',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.name()
        t.model.createdAt()
        t.model.updatedAt()
        t.model.isDeleted()
        t.model.detail()
        t.model.items({
            filtering: { isArchived: true },
            ordering: { position: true },
        })
        t.model.owner()
        t.model.section()
    },
})

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.author()
        t.model.isArchived()
        t.model.title()
        t.model.position()
        t.model.imageUrl()
        t.model.productUrl()
        t.model.description()
        t.model.provider()
        t.model.comment()
        t.model.type()
        t.model.meta()
        t.model.createdAt()
    },
})

export const SearchItem = objectType({
    name: 'SearchItem',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('author', { nullable: true })
        t.string('type')
    },
})

export const ItemType = enumType({
    name: 'ItemType',
    members: [
        'book',
        'album',
        'movie',
        'people',
        'video',
        'article',
        'podcast',
        'repository',
        'website',
    ],
})
