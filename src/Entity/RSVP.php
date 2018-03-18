<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Ulid\Ulid;

/**
 * RSVP
 *
 * @ORM\Table(name="rsvp")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class RSVP
{
    /**
     * @var integer
     *
     * @ORM\Column(name="rsvp_id", type="string", length=26)
     * @ORM\Id
     */
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="attending", type="boolean")
     * @Assert\NotNull()
     */
    private $attending;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      max = "255"
     * )
     */
    private $first_name;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      max = "255"
     * )
     */
    private $last_name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255)
     * @Assert\Email()
     * @Assert\Length(
     *      max = "255"
     * )
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="phone", type="string", length=20)
     * @Assert\NotBlank()
     * @Assert\Length(
     *      max = "20"
     * )
     */
    private $phone;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="note", type="text", nullable=true)
     */
    private $note;

    /**
     * @var Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Guest", mappedBy="rsvp", cascade={"all"})
     */
    private $guest;

    /**
     * Construct
     */
    public function __construct()
    {
        $this->id = (string) Ulid::generate();
        $this->guest = new ArrayCollection();
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedValue() : void
    {
        $this->created = new \DateTime();
    }

    /**
     * Get id
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getId() : string
    {
        return $this->id;
    }

    /**
     * Set attending
     *
     * @Groups("create")
     *
     * @param boolean $attending
     * @return RSVP
     */
    public function setAttending(bool $attending) : self
    {
        $this->attending = $attending;

        return $this;
    }

    /**
     * Get attending
     *
     * @Groups("read")
     *
     * @return boolean
     */
    public function getAttending() : bool
    {
        return $this->attending;
    }

    /**
     * Set first name
     *
     * @Groups("create")
     *
     * @param string $first_name
     * @return RSVP
     */
    public function setFirstName(string $first_name) : self
    {
        $this->first_name = $first_name;

        return $this;
    }

    /**
     * Get first_name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getFirstName() : string
    {
        return $this->first_name;
    }

    /**
     * Set last_name
     *
     * @Groups("create")
     *
     * @param string $last_name
     * @return RSVP
     */
    public function setLastName(string $last_name) : self
    {
        $this->last_name = $last_name;

        return $this;
    }

    /**
     * Get last_name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getLastName() : string
    {
        return $this->last_name;
    }

    /**
     * Set email
     *
     * @Groups("create")
     *
     * @param string $email
     * @return RSVP
     */
    public function setEmail(string $email) : self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getEmail() : string
    {
        return $this->email;
    }

    /**
     * Set phone
     *
     * @Groups("create")
     *
     * @param string $phone
     * @return RSVP
     */
    public function setPhone(string $phone) : self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getPhone() : string
    {
        return $this->phone;
    }

    /**
     * Set note
     *
     * @Groups("create")
     *
     * @param string $note
     * @return RSVP
     */
    public function setNote(string $note) : self
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getNote() :? string
    {
        return $this->note;
    }

    /**
     * Add guest
     *
     * @param Guest $guest
     * @return RSVP
     */
    public function addGuest(Guest $guest) : self
    {
        $guest->setRsvp($this);

        $this->guest[] = $guest;

        return $this;
    }

    /**
     * Remove guest
     *
     * @param Guest $guest
     */
    public function removeGuest(Guest $guest) : self
    {
        $guest->setRsvp(null);

        $this->guest->removeElement($guest);

        return $this;
    }

    /**
     * Set guest
     *
     * @Groups("create")
     *
     * @return self
     */
    public function setGuest(Collection $guest) : self
    {
        $this->guest = $guest;

        return $this;
    }

    /**
     * Get guest
     *
     * @Groups("read")
     *
     * @return Collection
     */
    public function getGuest() : Collection
    {
        return $this->guest;
    }


    /**
     * Get created
     *
     * @Groups("read")
     *
     * @return \DateTimeInterface
     */
    public function getCreated() : \DateTimeInterface
    {
        return $this->created;
    }
}
