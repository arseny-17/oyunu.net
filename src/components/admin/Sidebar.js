import Link from 'next/link'

export default function Sidebar(){
    return (
        <>
      
        <div className="sidebar">
            <Link href="/admin/options"><span class="material-icons">settings_suggest</span>Опции</Link>
            <Link href="/admin/pages"><span class="material-icons">article</span>Страницы</Link>
            <Link href="/admin/add-page"><span class="material-icons">post_add</span>Создать страницу</Link>
            <Link href="/admin/categories"><span class="material-icons">translate</span>Языки</Link>
            <Link href="/admin/add-category"><span class="material-icons">language</span>Добавить язык</Link>
            <Link href="/admin/media-library"><span class="material-icons">perm_media</span>Медиабиблиотека</Link>
            <Link href="/admin/add-menu"><span class="material-icons">perm_media</span>Добавить меню</Link>
            <Link href="/admin/all-menus"><span class="material-icons">perm_media</span>Все меню</Link>
          </div>
    </>
    )
}

