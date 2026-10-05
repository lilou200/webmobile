import vine from '@vinejs/vine';

const oncallPagenbSchema = vine.object({
    pagenb: vine.number()
});

const oncallDateSchema = vine.object({
    date: vine.date({
        formats: 'YYYY-MM-DD'
    })
});

/**
 * @swagger
 * components:
 *  schemas:
 *      oncallToAdd:
 *          type: object
 *          properties:
 *              date:
 *                  type: string
 *              isnightoncall:
 *                  type: boolean
 *          required:
 *              - date
 *              - isnightoncall
 */
const oncallAddSchema = vine.object({
    date: vine.date({
        formats: 'YYYY-MM-DD'
    }),
    isnightoncall: vine.boolean()
})

export const 
    searchedAllOncall = vine.compile(oncallPagenbSchema),
    searchedOncallByDate = vine.compile(oncallDateSchema),
    oncallToAdd = vine.compile(oncallAddSchema);